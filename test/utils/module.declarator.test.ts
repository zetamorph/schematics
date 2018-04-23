import { normalize } from '@angular-devkit/core';
import { expect } from 'chai';
import { DeclarationOptions, ModuleDeclarator } from '../../src/utils/module.declarator';

describe('Module Declarator', () => {
  it('should add module declaration when declare', () => {
    const content: string =
      'import { Module } from \'@nestjs/common\';\n' +
      '\n' +
      '@Module({})\n' +
      'export class FooModule {}\n';
    const declarator = new ModuleDeclarator();
    const options: DeclarationOptions = {
      metadata: 'imports',
      type: 'module',
      name: 'bar',
      path: normalize('/src/foo'),
      module: normalize('/src/foo/foo.module.ts')
    };
    expect(declarator.declare(content, options)).to.be.equal(
      'import { Module } from \'@nestjs/common\';\n' +
      'import { BarModule } from \'./bar/bar.module\';\n' +
      '\n' +
      '@Module({\n' +
      '  imports: [\n' +
      '    BarModule\n' +
      '  ]\n' +
      '})\n' +
      'export class FooModule {}\n'
    );
  });
  it('should manage no type', () => {
    const content: string =
      'import { Module } from \'@nestjs/common\';\n' +
      '\n' +
      '@Module({})\n' +
      'export class FooModule {}\n';
    const declarator = new ModuleDeclarator();
    const options: DeclarationOptions = {
      metadata: 'providers',
      name: 'foo',
      path: normalize('/src/foo'),
      module: normalize('/src/foo/foo.ts')
    };
    expect(declarator.declare(content, options)).to.be.equal(
      'import { Module } from \'@nestjs/common\';\n' +
      'import { Foo } from \'./foo/foo\';\n' +
      '\n' +
      '@Module({\n' +
      '  providers: [\n' +
      '    Foo\n' +
      '  ]\n' +
      '})\n' +
      'export class FooModule {}\n'
    );
  });
});
