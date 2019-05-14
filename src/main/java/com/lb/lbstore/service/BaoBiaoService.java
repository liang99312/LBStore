/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.BaoBiao;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface BaoBiaoService {

    public BaoBiao getBaoBiaoById(Integer id);
    
    public List<BaoBiao> getAllBaoBiaos(Integer qy_id);
    
    public List<BaoBiao> getBaoBiaosByMk(Integer qy_id,String mkdm);
    
    public boolean updateBaoBiao(BaoBiao baoBiao);
    
    public BaoBiao saveBaoBiao(BaoBiao baoBiao);
    
    public boolean deleteBaoBiao(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<BaoBiao> queryBaoBiaosByPage(HashMap map);
    
    public int queryMkRows(HashMap map);
    
    public List<BaoBiao> queryMkBaoBiaosByPage(HashMap map);

}
